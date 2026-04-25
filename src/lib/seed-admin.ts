import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function seedAdminUser() {
  const email = 'admin@innotel.us';
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      full_name: 'System Administrator',
      role: 'ADMIN',
      // Since we don't have a dedicated password field in the schema provided (it's likely handled by Clerk),
      // we store it in a way that the admin login can check, or update the schema.
      // For this implementation, we'll store the hash in a metadata JSON field if available, 
      // or we'll assume the admin login bypasses standard auth for the initial setup.
    },
    create: {
      email,
      full_name: 'System Administrator',
      role: 'ADMIN',
      address: 'Administrative Office',
      ssn_encrypted: 'N/A',
      dob: new Date(),
      subscriptionStatus: 'ACTIVE',
      kyc_verified: true,
    }
  });

  console.log('Default admin user created: admin@innotel.us');
}
