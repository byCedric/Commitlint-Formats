// @flow
import { type Report } from '@commitlint/format';

/**
 * Format the commitlint report to a (minified) JSON string.
 *
 * @param  {Object} report
 * @return {string}
 */
function formatJson(report?: Report): string {
	return JSON.stringify(report || {});
}

module.exports = formatJson;
