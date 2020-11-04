/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';
import {Command, CLIError, flags} from '@microsoft/bf-cli-command';
import {Orchestrator, Utility} from '@microsoft/bf-orchestrator';
import {OrchestratorSettings} from '../../utils/settings';
import {Utility as UtilityDispatcher} from '@microsoft/bf-dispatcher';

export default class OrchestratorCreate extends Command {
  static description: string = 'Creates Orchestrator example file from .lu/.qna files, which represent bot modules';

  static flags: flags.Input<any> = {
    in: flags.string({char: 'i', description: 'The path to source label files from where orchestrator example file will be created from. Default to current working directory.'}),
    out: flags.string({char: 'o', description: 'Path where generated orchestrator snapshot file will be placed. Default to current working directory.'}),
    model: flags.string({char: 'm', description: 'Path to Orchestrator base model directory.'}),
    hierarchical: flags.boolean({description: 'Add hierarchical labels based on lu/qna file name.'}),
    // force: flags.boolean({char: 'f', description: 'If --out flag is provided with the path to an existing file, overwrites that file.', default: false}),
    // fullEmbeddings: flags.boolean({description: 'Optional flag to create full embeddings instead of compact embeddings.'}),
    debug: flags.boolean({char: 'd'}),
    help: flags.help({char: 'h', description: 'Orchestrator create command help'}),
  }
  // ---- NOTE ---- advanced parameters removed from command line, but still can be set through environment variables.
  //
  // --fullEmbeddings  Optional flag to create full embeddings instead
  //                   of compact embeddings.

  async run(): Promise<number> {
    const {flags}: flags.Output = this.parse(OrchestratorCreate);
    const flagsKeys: string[] = Object.keys(flags);
    if (Utility.isEmptyStringArray(flagsKeys)) {
      this._help();
    }

    const cwd: string = process.cwd();
    const input: string = path.resolve(flags.in || cwd);
    const output: string = flags.out;
    const baseModelPath: string = flags.model;

    try {
      let fullEmbeddings: boolean = false;
      if (process.env.fullEmbeddings) {
        fullEmbeddings = true;
      }
      Utility.toPrintDebuggingLogToConsole = flags.debug;
      UtilityDispatcher.toPrintDebuggingLogToConsole = flags.debug;
      OrchestratorSettings.init(cwd, baseModelPath, output, cwd);
      await Orchestrator.createAsync(
        OrchestratorSettings.ModelPath,
        input, OrchestratorSettings.SnapshotPath,
        flags.hierarchical,
        fullEmbeddings);
      OrchestratorSettings.persist();
    } catch (error) {
      throw (new CLIError(error));
    }

    return 0;
  }
}
