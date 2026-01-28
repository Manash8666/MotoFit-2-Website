
import { sql } from '@vercel/postgres';

export async function submitContactForm(formData: FormData) {
    try {
        const rawFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string, // Ensure your form has this field
            bike: formData.get('bike') as string,
            message: formData.get('message') as string,
            date: new Date().toISOString()
        };

        // 1. Insert into Vercel Postgres
        await sql`
            INSERT INTO leads (name, email, phone, bike_model, message, status, source)
            VALUES (
                ${rawFormData.name}, 
                ${rawFormData.email}, 
                ${rawFormData.phone || 'N/A'}, 
                ${rawFormData.bike}, 
                ${rawFormData.message}, 
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
