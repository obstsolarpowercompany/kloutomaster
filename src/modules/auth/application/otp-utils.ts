import { BadRequestException, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { OTP } from "../../user/domain/entities/otp.entity";
import UserService from "../../user/application/user.service";
import { EntityManager, Repository } from "typeorm";

// Generate and save OTP to the OTP table// otp.helpers.ts
export async function generateAndSaveOtp(
  otpRepository: Repository<OTP>,
  contact: string,
  userId: string,
  contactType: "email" | "phone" = "email"
): Promise<{ savedOtp: OTP; otpCode: string }> {
  // Generate OTP (6 digits)
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP code for storage
  const hashedOtp = await bcrypt.hash(otpCode, 10);

  // Set expiry time for OTP (5 minutes)
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  // Create and save OTP to the database
  const newOtp = new OTP();
  if (contactType === "email") {
    newOtp.email = contact;
    newOtp.phone = null;
  } else {
    newOtp.phone = contact;
    newOtp.email = null;
  }
  newOtp.otp_code = hashedOtp;
  newOtp.expiry = expiry;
  newOtp.user = { id: userId } as any;

  const savedOtp = await otpRepository.save(newOtp);

  return { savedOtp, otpCode };
}

export async function generateAndSavePhoneOtp(
  otpRepository: Repository<OTP>,
  phone: string,
  userId: string
): Promise<{ savedOtp: OTP; otpCode: string }> {
  return generateAndSaveOtp(otpRepository, phone, userId, "phone");
}

// Helper function to validate OTP

export async function validateOtp(email: string, otp: string, userId: string, userService: UserService, manager?: EntityManager): Promise<boolean> {
  try {
    // Get the OTP record within the transaction if a manager is provided
    const storedOtp = await userService.getLastOtpByEmail(email, manager);

    // If OTP is not found, return a BadRequestException
    if (!storedOtp) {
      throw new BadRequestException("OTP not found for the email");
    }

    // Check if OTP has expired
    if (new Date() > new Date(storedOtp.expiry)) {
      // Ensure expiry is compared correctly
      throw new BadRequestException("OTP has expired");
    }

    // Compare entered OTP with stored (hashed) OTP
    const isValid = await bcrypt.compare(otp, storedOtp.otp_code);
    if (!isValid) {
      throw new BadRequestException("Invalid OTP");
    }

    // OTP is valid, delete the OTP after use within the transaction if provided
    await userService.deleteValidatedOtp(email, manager);
    return true;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
}
// Helper function to validate OTP
// export async function validateOtp(
//   email: string,
//   otp: string,
//   userId: string,
//   userService: UserService,
// ): Promise<boolean> {
//   const storedOtp = await userService.getLastOtpByEmail(email);

//   console.log('Stored OTP Expiry:', storedOtp.expiry);
//   console.log('Current Date:', new Date());

//   if (!storedOtp) {
//     throw new NotFoundException('OTP not found for the email');
//   }

//   // Check if OTP has expired
//   if (new Date() > storedOtp.expiry) {
//     throw new BadRequestException('OTP has expired');
//   }

//   // Compare entered OTP with stored (hashed) OTP
//   const isValid = await bcrypt.compare(otp, storedOtp.otp_code);
//   if (!isValid) {
//     throw new NotFoundException('Invalid OTP');
//   }

//   // OTP is valid, delete the OTP after use
//   await userService.deleteValidatedOtp(email);
//   return true;
// }

// Optionally, provide a method to retrieve the current OTP for testing purposes
export function getOtp(email: string, otpStore: Map<string, { otp: string; expiry: Date }>): string | undefined {
  return otpStore.get(email)?.otp;
}
