

export async function submitContactForm(formData: FormData) {
    // Simulate network delay & API call to "MotoFit 2 App"
    await new Promise((resolve) => setTimeout(resolve, 800));

    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        bike: formData.get('bike'),
        message: formData.get('message'),
        date: new Date().toISOString()
    };

    // GENERATE LEAD ID (The "Bridge")
    const leadId = `LEAD_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate API Call to External Ecosystem
    console.log('--------------------------------------------------');
    console.log('⚡ MOTOFT 2 ECOSYSTEM BRIDGE ACTIVATED');
    console.log(`🔗 POST https://app.motofit.in/api/v1/leads`);
    console.log('--------------------------------------------------');
    console.log('Payload:', JSON.stringify({ ...rawFormData, source: 'WEBSITE_WIDGET' }, null, 2));
    console.log(`✅ LEAD CREATED: [${leadId}]`);
    console.log('--------------------------------------------------');

    return {
        success: true,
        message: `Request initialized. Ticket #${leadId} created in workshop system.`,
        leadId: leadId
    };
}
