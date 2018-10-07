// @flow
declare module '@commitlint/format' {
	declare type RuleIssue = {
		valid: boolean,
		level: number,
		name: string,
		message: string,
	};

	declare type ReportResult = {
		valid: boolean,
		input: string,
		errors: RuleIssue[],
		warnings: RuleIssue[],
	};

	declare type Report = {
		valid: boolean,
		errorCount: number,
		warningCount: number,
		results: ReportResult[],
	};
}
