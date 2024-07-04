import { db } from "@/lib/db/index";
import {
  companies,
  companyIdSchema,
  type CompanyId,
} from "@/lib/db/schema/companies";
import { eq } from "drizzle-orm";

export const getCompanies = async () => {
  const s = await db.select().from(companies);
  return { companies: s };
};

export const getCompanyById = async (id: CompanyId) => {
  const { id: companyId } = companyIdSchema.parse({ id });
  const [s] = await db
    .select()
    .from(companies)
    .where(eq(companies.id, companyId));
  return { company: s };
};
