-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'mentor', 'student');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student';
