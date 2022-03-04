import { SuperDuperRememberer, ExecuteStatementCommand, DescribeStatementCommand } from "./super-duper-rememberer";

const delayForRetryCall = Number(process.env.delayForRetryCall) || 1000;

export async function rememberData(
  rememberer: SuperDuperRememberer,
  data: string[]
): Promise<void> {
  const beginStatement = "CAN YOU PLEASE REMEMBER THESE ITEMS?";
  const endStatement = "K THX BYE.";
  const statementLength = beginStatement.length + endStatement.length;
  // beginStatement + endStatement (46) + '' to wrap word + __ 2 white spaces is 50, so string must be max 250 char long
  const maxLength = 300 - (statementLength + 2 + 2);

  if (data.length === 0) {
    const e = new Error("Data is empty array, nothing to remember.");
    e.name = "DataIsEmptyArray";
    throw e;
  }
  data.forEach(d => {
    if (!/^([a-z]+$)/g.test(d)) {
      const e = new Error(`Can't process word ${d}, the word is not lowercase.`);
      e.name = "WordIsNotInLowercase";
      throw e;
    }
    if (d.length > maxLength) {
      const e = new Error(`Can't process word ${d}, the word is too long to process (${d.length}) (max length of 1 word is ${maxLength}).`);
      e.name = "WordExceededMaxLength";
      throw e;
    }
  });

  const statements: string[] = [];
  let stringToRemember = "";
  for (const str of data) {
    if (stringToRemember.length === 0) {
      stringToRemember = `'${str}'`;
    } else {
      if (stringToRemember.length + str.length + 3 < maxLength) {
        stringToRemember += `,'${str}'`;
      } else {
        statements.push(stringToRemember);
        stringToRemember = `'${str}'`;
      }
    }
  }
  statements.push(stringToRemember);

  for (const statement of statements) {
    const statementCall = `${beginStatement} ${statement} ${endStatement}`;
    await executeWaitingCall(rememberer, statementCall);
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function executeWaitingCall(rememberer: SuperDuperRememberer,statement: string): Promise<void> {
  const result = await rememberer.executeCommand(new ExecuteStatementCommand({ statement }));
  let status = await rememberer.executeCommand(new DescribeStatementCommand( { id: result.id } ));

  while (status.status === "RUNNING") {
    await delay(delayForRetryCall);
    status = await rememberer.executeCommand(new DescribeStatementCommand( { id: result.id } ));
  }
  if (status.status === "FAILED") {
    const e = new Error(`SDR end up with error status ${status.status} and message ${status.error}.`);
    e.name = "SdrEndUpWithFailedStatus";
    throw e;
  }
  if (status.status === "DONE") {
    return;
  }
}

