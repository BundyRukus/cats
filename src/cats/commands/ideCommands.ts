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


/** 
 * This module contains all the global commands pertaining to IDE functionality
 */
module Cats.Commands {

    /**
     * Quit CATS
     */ 
    function quit() {
         if (IDE.hasUnsavedSessions()) {
            if (! confirm("There are unsaved files!\nDo you really want to quit?")) return;
        }
        IDE.saveConfig();
        GUI.App.quit();
    }


    function setIdeTheme(theme:string) {            
        qx.theme.manager.Meta.getInstance().setTheme(theme);
    }



    function toggleView(component:qx.ui.core.Widget) {
       if (component.isVisible()) { 
            component.exclude();    
        } else {
            component.show();
        }
    }
    
    function configureIde() {
        var w = new IdeConfigDialog(IDE.config);
        // w.setData(IDE.project.config.compiler);
        w.show();
    }
    /**
     * Register the IDE commands
     */ 
    export class IdeCommands {
        static init(registry:(cmd:Command)=>void) {
            registry({ name: CMDS.ide_quit, label: "Quit", command: quit });
           registry({ name: CMDS.ide_toggleView, label : "Toggle View", command: toggleView });
            registry({ name: CMDS.ide_configure, label: "Settings", command: configureIde });

        }
    }


}