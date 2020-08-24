/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import assert = require('assert');

import * as path from 'path';
import * as fs from 'fs';

import {} from 'mocha';

import {OrchestratorEvaluate} from '../src/evaluate';
import {Utility} from '../src/utility';
import {UnitTestHelper} from './utility.test';

describe('Test Suite - evaluate', () => {
  it('Test.0000 OrchestratorEvaluate.runAsync()', async function () {
    Utility.toPrintDebuggingLogToConsole = UnitTestHelper.getDefaultUnitTestDebuggingLogFlag();
    this.timeout(UnitTestHelper.getDefaultUnitTestTimeout());
    Utility.debuggingLog(`process.cwd()=${process.cwd()}`);
    const inputPath: string = './resources/data/Columnar/Email.blu';
    const outputPath: string = './resources/data/Columnar/OrchestratorEvaluate_Email';
    const nlrPath: string = '';
    const ambiguousClosenessParameter: number = Utility.DefaultAmbiguousClosenessParameter;
    const lowConfidenceScoreThresholdParameter: number = Utility.DefaultLowConfidenceScoreThresholdParameter;
    const multiLabelPredictionThresholdParameter: number = Utility.DefaultMultiLabelPredictionThresholdParameter;
    const unknownLabelPredictionThresholdParameter: number = Utility.DefaultUnknownLabelPredictionThresholdParameter;
    const snapshotSetScoresOutputFilename: string = path.join(outputPath, OrchestratorEvaluate.snapshotSetScoresOutputFilename);
    const snapshotSetGroundTruthJsonContentOutputFilename: string = path.join(outputPath, OrchestratorEvaluate.snapshotSetGroundTruthJsonContentOutputFilename);
    const snapshotSetPredictionJsonContentOutputFilename: string = path.join(outputPath, OrchestratorEvaluate.snapshotSetPredictionJsonContentOutputFilename);
    const snapshotSetSummaryHtmlOutputFilename: string = path.join(outputPath, OrchestratorEvaluate.snapshotSetSummaryHtmlOutputFilename);
    const snapshotSetLabelsOutputFilename: string = path.join(outputPath, OrchestratorEvaluate.snapshotSetLabelsOutputFilename);
    await OrchestratorEvaluate.runAsync(
      inputPath,
      outputPath,
      nlrPath,
      ambiguousClosenessParameter,
      lowConfidenceScoreThresholdParameter,
      multiLabelPredictionThresholdParameter,
      unknownLabelPredictionThresholdParameter);
    // ---- NOTE ---- clean up after unit tests.
    const toCleanUpAfterUnitTest: boolean = UnitTestHelper.getDefaultUnitTestCleanUpFlag();
    if (toCleanUpAfterUnitTest) {
      try {
        Utility.deleteFile(snapshotSetScoresOutputFilename);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output score file="${snapshotSetScoresOutputFilename}", error=${error}`);
      }
      try {
        Utility.deleteFile(snapshotSetGroundTruthJsonContentOutputFilename);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output ground-truth json file="${snapshotSetGroundTruthJsonContentOutputFilename}", error=${error}`);
      }
      try {
        Utility.deleteFile(snapshotSetPredictionJsonContentOutputFilename);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output prediction json file="${snapshotSetPredictionJsonContentOutputFilename}", error=${error}`);
      }
      try {
        Utility.deleteFile(snapshotSetSummaryHtmlOutputFilename);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output summary file="${snapshotSetSummaryHtmlOutputFilename}", error=${error}`);
      }
      try {
        Utility.deleteFile(snapshotSetLabelsOutputFilename);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output labels file="${snapshotSetLabelsOutputFilename}", error=${error}`);
      }
      try {
        fs.rmdirSync(outputPath);
      } catch (error) {
        Utility.debuggingLog(`Test.0000 OrchestratorEvaluate, FAILED deleting output folder=${outputPath}, error=${error}`);
      }
    }
    Utility.debuggingLog('THE END - Test.0000 OrchestratorEvaluate.runAsync()');
  });
});

