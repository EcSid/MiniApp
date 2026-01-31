export default function cutString(str: string, maxLength = 26) {
	if (!str) return '...'
	if (str.length <= maxLength) return str
	return str.slice(0, maxLength - 3) + '...'
}
