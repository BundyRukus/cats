//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module Cats.View {


export function showErrors(errors: Cats.FileRange[] = []) {

        IDE.resultbar.selectOption(0);
        var grid = new Cats.UI.Grid();
        grid.setColumns(["message", "fileName", "position"]);
        grid.setAspect("position", (data:FileRange) => { return (data.range.start.row + 1) + ":" + (data.range.start.column + 1) });

        grid.setRows(errors);
        grid.onselect = function(data:FileRange) {
            IDE.openSession(data.fileName, data.range.start);
        };

        grid.render();

        var result = IDE.compilationResult;
        result.innerHTML = "";
        grid.appendTo(result);    
    
}


export function showCompilationResults(data:Cats.CompileResults) {

            if (data.errors && (data.errors.length > 0)) {
                showErrors(data.errors);
                return;
            }

            // Lets puts a timestamp so it is clear we did something
            IDE.resultbar.selectOption(2);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console.innerText += "\n" + stamp + " Successfully compiled " + Object.keys(data.source).length + " file(s).\n";
            IDE.console.scrollTop = IDE.console.scrollHeight; // Scroll to bottom



    }
    
}