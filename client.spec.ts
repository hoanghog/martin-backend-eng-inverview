import {SuperDuperRememberer} from "./super-duper-rememberer";
import {rememberData} from "./client";

jest.setTimeout(99999999);
let rememberer: SuperDuperRememberer;

beforeEach(() => {
  rememberer = new SuperDuperRememberer();
});

it("should successfully remember basic string", async () => {
  const successfulData = ["basicstringtoremember"];
  await rememberData(rememberer, successfulData);

  expect(rememberer.memory).toEqual(successfulData);
});

it("should successfully remember multiple strings", async () => {
  const successfulData = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  await rememberData(rememberer, successfulData);

  expect(rememberer.memory).toEqual(successfulData);
});

it("should successfully remember multiple strings exceeding one call", async () => {
  const successfulData = [
    "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddda",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddb",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddc",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddde"
  ];
  await rememberData(rememberer, successfulData);

  expect(rememberer.memory).toEqual(successfulData);
});

it("should successfully remember long long long array of strings", async () => {
  const successfulData = [
    "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddda",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddb",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddc",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddde",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddg",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddh",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddi",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddj",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddk",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddl",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddm",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddn",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddo",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddp",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddq",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddr",
    "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddds",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddt",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddu",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddv",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddx",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddy",
    "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddz"
  ];
  await rememberData(rememberer, successfulData);

  expect(rememberer.memory).toEqual(successfulData);
});

it("should successfully remember 100 strings", async () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const charLength = chars.length;

  const successfulData: string[] = [];
  for (let i = 0; i < 100; i++) {
    let result = "";
    for (let j = 0; j < 3; j++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    successfulData.push(result);
  }
  await rememberData(rememberer, successfulData);

  expect(rememberer.memory).toEqual(successfulData);
});

it("should throw error DataIsEmptyArray", async () => {
  const badData: string[] = [];

  expect.assertions(2);
  try {
    await rememberData(rememberer, badData);
  } catch (e: unknown) {
    expect((e as Error).message).toEqual("Data is empty array, nothing to remember.");
    expect((e as Error).name).toEqual("DataIsEmptyArray");
  }
});

it("should throw error WordIsNotInLowercase", async () => {
  const badData = [
    "aaa", "bbb", "cCc", "ddd", "eee"
  ];

  expect.assertions(2);
  try {
    await rememberData(rememberer, badData);
  } catch (e: unknown) {
    expect((e as Error).message).toEqual(`Can't process word ${badData[2]}, the word is not lowercase.`);
    expect((e as Error).name).toEqual("WordIsNotInLowercase");
  }
});

it("should throw error WordIsNotInLowercase with numbers", async () => {
  const badData = [
    "aaa", "bbb", "123", "ddd", "eee"
  ];

  expect.assertions(2);
  try {
    await rememberData(rememberer, badData);
  } catch (e: unknown) {
    expect((e as Error).message).toEqual(`Can't process word ${badData[2]}, the word is not lowercase.`);
    expect((e as Error).name).toEqual("WordIsNotInLowercase");
  }
});

it("should throw error WordExceededMaxLength", async () => {
  const badData = [
    "a",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "a"
  ];

  expect.assertions(2);
  try {
    await rememberData(rememberer, badData);
  } catch (e: unknown) {
    expect((e as Error).message).toEqual(`Can't process word ${badData[1]}, the word is too long to process (${badData[1].length}) (max length of 1 word is ${250}).`);
    expect((e as Error).name).toEqual("WordExceededMaxLength");
  }
});


