export default {
	'*.{js,ts,mjs}': [
		'eslint --max-warnings 0',
		'prettier --write',
		'terraform validate',
	],
	'ci/app/**/*.tf': () => [
		'terraform -chdir=ci/app validate',
		'terraform -chdir=ci/app fmt -check',
	],
	'ci/bootstrap/**/*.tf': () => [
		'terraform -chdir=ci/bootstrap validate',
		'terraform -chdir=ci/bootstrap fmt -check',
	],
	'ci/ci-auth/**/*.tf': () => [
		'terraform -chdir=ci/ci-auth validate',
		'terraform -chdir=ci/ci-auth fmt -check',
	],
}
