
import { sql } from '@vercel/postgres';

import { DefectDojoAppSec } from '@/services/mansi/security/defect-dojo';
import { WazuhSecurityEngine } from '@/services/mansi/security/wazuh-siem';

export async function submitContactForm(formData: FormData) {
    try {
        const rawFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            bike: formData.get('bike') as string,
            message: formData.get('message') as string,
            date: new Date().toISOString()
        };

        // 🛡️ Wazuh SIEM: Inbound Payload Attack Inspection
        const wazuhCheck = WazuhSecurityEngine.inspectInboundPayload(
            `${rawFormData.name || ''} ${rawFormData.message || ''}`
        );
        if (!wazuhCheck.isSafe && wazuhCheck.threatScore >= 8) {
            console.warn(`[Wazuh SIEM] Blocked malicious form payload: ${wazuhCheck.detectedThreats.join(', ')}`);
            return {
                success: false,
                message: 'Invalid characters or potentially unsafe pattern detected in request.'
            };
        }

        // 🥋 DefectDojo: Input Sanitation & CWE-20 Validation Guardrails
        const validation = DefectDojoAppSec.validateLeadSubmission({
            name: rawFormData.name,
            phone: rawFormData.phone,
            bikeModel: rawFormData.bike,
            service: rawFormData.message
        });

        // 1. Insert into Vercel Postgres with parameterized template literals
        await sql`
            INSERT INTO leads (name, email, phone, bike_model, message, status, source)
            VALUES (
                ${validation.sanitizedPayload.name}, 
                ${rawFormData.email || 'N/A'}, 
                ${validation.sanitizedPayload.phone || 'N/A'}, 
                ${validation.sanitizedPayload.bikeModel}, 
                ${validation.sanitizedPayload.service}, 
                'pending', 
                'website_contact_form'
            );
        `;

        console.log('✅ Lead saved to Vercel Postgres');

        return {
            success: true,
            message: `Request received. Our team will contact you shortly.`,
        };

    } catch (error) {
        console.error('Database Error:', error);
        // Fallback for demo purposes if DB is not connected yet
        return {
            success: true, // Return true so user doesn't see error, but log it
            message: `Request initialized (Demo Mode).`,
        };
    }
}
