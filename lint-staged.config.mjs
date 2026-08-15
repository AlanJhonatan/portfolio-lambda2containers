export default {
	'*.{js,ts,mjs}': ['eslint --max-warnings 0', 'prettier --write'],
	'ci/app/**/*.tf': () => [
		'terraform -chdir=ci/app fmt -check',
		'terraform -chdir=ci/app validate',
	],
	'ci/bootstrap/**/*.tf': () => [
		'terraform -chdir=ci/bootstrap fmt -check',
		'terraform -chdir=ci/bootstrap validate',
	],
	'ci/ci-auth/**/*.tf': () => [
		'terraform -chdir=ci/ci-auth fmt -check',
		'terraform -chdir=ci/ci-auth validate',
	],
}
