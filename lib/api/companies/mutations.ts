import { db } from "@/lib/db/index";
import {
  CompanyId,
  NewCompanyParams,
  UpdateCompanyParams,
  companies,
  companyIdSchema,
  insertCompanieschema,
  updateCompanieschema,
} from "@/lib/db/schema/companies";
import { eq } from "drizzle-orm";

export const createCompany = async (company: NewCompanyParams) => {
  const newCompany = insertCompanieschema.parse(company);
  try {
    const [s] = await db.insert(companies).values(newCompany).returning();
    return { company: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompany = async (
  id: CompanyId,
  company: UpdateCompanyParams,
) => {
  const { id: companyId } = companyIdSchema.parse({ id });
  const newCompany = updateCompanieschema.parse(company);
  try {
    const [s] = await db
      .update(companies)
      .set(newCompany)
      .where(eq(companies.id, companyId!))
      .returning();
    return { company: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompany = async (id: CompanyId) => {
  const { id: companyId } = companyIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(companies)
      .where(eq(companies.id, companyId!))
      .returning();
    return { company: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
