/*
compiler_options = {
	canCallDefinitionSignature: false,
	codeGenTarget: 0,
	controlFlow: false,
	controlFlowUseDef: false,
	emitComments: false,
	errorOnWith: true,
	errorRecovery: false,
	exec: false,
	generateDeclarationFiles: false,
	inferPropertiesFromThisAssignment: false,
	mapSourceFiles: false,
	minWhitespace: false,
	moduleGenTarget: 0,
	outputFileName: "",
	outputMany: true,
	parseOnly: false,
	preprocess: true,
	printControlFlow: false,
	propagateConstants: false,
	resolve: true,
	styleSettings: {
		assignmentInCond: false,
		bitwise: false,
		blockInCompoundStmt: false,
		emptyBlocks: true,
		eqeqeq: false,
		eqnull: false,
		evalOK: true,
		forin: false,
		funcInLoop: true,
		implicitAny: false,
		innerScopeDeclEscape: true,
		literalSubscript: true,
		newMustBeUsed: false,
		reDeclareLocal: true,
		requireSemi:false
	},
	useCaseSensitiveFileResolution: false,
	useDefaultLib: true,
	watch: false
}
*/

/*

var formatting_options = {
        public IndentSize: number;
        public TabSize: number;
        public NewLineCharacter: string;
        public ConvertTabsToSpaces: bool;
        public InsertSpaceAfterCommaDelimiter: bool;
        public InsertSpaceAfterSemicolonInForStatements: bool;
        public InsertSpaceBeforeAndAfterBinaryOperators: bool;
        public InsertSpaceAfterKeywordsInControlFlowStatements: bool;
        public InsertSpaceAfterFunctionKeywordForAnonymousFunctions: bool;
        public InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: bool;
        public PlaceOpenBraceOnNewLineForFunctions: bool;
        public PlaceOpenBraceOnNewLineForControlBlocks: bool;
}
*/

function errorHandler(err,data) {
	if (err) {
		console.log(err);
		alert("Error occured, check console logging");
	}
}

module Cats {
	
	import fs = module("fs");
	import path = module("path");

	export class Configuration {

		static NAME = ".settings" + path.sep + "config.json";
		private _config;

		constructor(projectRoot:string) {
			var fileName = path.join(projectRoot,Configuration.NAME);
			var dir:string = path.dirname(fileName);
			fs.exists(dir, (exists) => {
					if (! exists) {
						fs.mkdirSync(dir); //Should be called only once.
						console.log("created .setting directory");
					}
			});	
		}

		load() {
			try {
				var content = project.readTextFile(Configuration.NAME);
				this._config = JSON.parse(content);
			} catch (err) {
				console.log("Couldn't load project configuration, loading defaults");
				this.loadDefault();
			}
		}

		config() {
			return this._config;
		}

		stringify() {
			var result = JSON.stringify(this._config, null, 4);
			return result;
		}



		loadDefault() {
			this._config = {	
				theme : "clouds",
				fontSize: "14px",
				main: "index.html",
				sourcePath : null, //If not set, the whole project directory is the source directory
				outputPath: null,

				compiler : {
					useDefaultLib: true,
					outputMany: true,
					outputFileName: "main.js",
					emitComments: false,
					generateDeclarationFiles: false,
					mapSourceFiles: false,
        			codeGenTarget: 1,
        			moduleGenTarget: 0
				},
				minify: false,
				rememberOpenFiles : false
			};
		}

	}

}