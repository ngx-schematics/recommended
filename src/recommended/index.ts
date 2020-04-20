import { Rule, SchematicContext, Tree, apply, move, url, mergeWith, MergeStrategy } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from 'schematics-utilities';

// const SCRIPTS = {
//   npm: {
//     install: 'npm install',
//     run: 'npm run'
//   },
//   yarn: {
//     install: 'yarn',
//     run: 'yarn run'
//   }
// }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function recommended(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'husky', version: '^4.2.5'});
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'jsonlint', version: '^1.6.3'});
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'lint-staged', version: '^10.1.5'});
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'prettier', version: '^2.0.4'});
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'stylelint', version: '^2.0.4'});
    addPackageJsonDependency(tree, { type: NodeDependencyType.Dev, name: 'stylelint-config-recommended-scss', version: '^4.2.0'});
    
    const copiedFiles = apply(url('./files'), [
      move('.')
    ]);
    
    const rule = mergeWith(copiedFiles, MergeStrategy.Default);
    

    _context.addTask(new NodePackageInstallTask());
    return rule(tree, _context);
  };
}
