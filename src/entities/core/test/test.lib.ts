import { TestDto } from "@/shared/api/core/test/test.types";
import { Test } from "./test.types";

export function transformTest(test: TestDto): Test {
  return test;
}
