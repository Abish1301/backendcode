
const BASE_URL = process.env.BASE_URL;

const emailTemplates = {
    otpTemplate: (otp) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">OTP Verification</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                <p style="font-size: 16px;">Your OTP code is:</p>
                <h1 style="color: #4CAF50; text-align: center; font-size: 32px;">${otp}</h1>
                <p style="color: #666;">This code will expire in 10 minutes.</p>
            </div>
            <p style="color: #999; text-align: center; margin-top: 20px;">If you didn't request this code, please ignore this email.</p>
        </div>
    `,
 
    welcomeTemplate: (username) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Welcome ${username}!</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                <p style="font-size: 16px;">We're excited to have you on board.</p>
                <p style="font-size: 16px;">Start exploring our amazing features today!</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get Started</a>
            </div>
        </div>
    `,
 
    resetPasswordTemplate: (resetLink) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                <p style="font-size: 16px;">Click the button below to reset your password:</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                </div>
                <p style="color: #666; margin-top: 20px;">This link will expire in 1 hour.</p>
            </div>
        </div>
    `,
    notificationTemplateIssue: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Issue Notification</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Name:${data.name}</h1>
            <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Remarks:${data.remarks||"N/A"}</h1>
            <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Site:${data?.Site?.name||"N/A"}</h1>
            <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Task:${data?.Task?.name||"N/A"}</h1>
            <img src="${BASE_URL}${data.image}" alt="issue image" style="max-width:100%; height:auto; display:block; margin:10px auto;" />

        </div>
    </div>
`,
notificationTemplateExpense: (data) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333; text-align: center;">Transaction Notification</h2>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Name:${data.name}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Remarks:${data.remark||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Site:${data?.Site?.name||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Task:${data?.Task?.name||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Date:${data?.date||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Type:${data?.ExpenseHead?.name||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Amount:${data?.amount||"N/A"}</h1>
        <img src="${BASE_URL}${data.image}" alt="transaction image" style="max-width:100%; height:auto; display:block; margin:10px auto;" />
    </div>
</div>
`,
notificationTemplateRequest:(data,Name)=>`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333; text-align: center;">${Name} Request Notification</h2>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
        <h1 style="color: #4CAF50; text-align: center; font-size: 14px;">Request from site:${data?.site} , task:${data?.task}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Expected delivery date:${data?.date||data?.extra?.e_date||"N/A"}</h1>
        <h1 style="color: #4CAF50; text-align: center; font-size: 12px;">Type:${data?.extra?.transfer==='2'?'Request from site to Main inventory':"Purchased from outside"}</h1>
         <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Name</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Unit</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Quantity</th>
            </tr>
            ${data?.records?.map(record => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${record.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${record.unit}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${record.qty}</td>
            </tr>`).join('')}
        </table>
    </div>
</div>

`,

};
module.exports = emailTemplates;
 
 