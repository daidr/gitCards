//  Import CSS.
import './style.scss';
import './editor.scss';
import { TextControl } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('gitcards/gitcards-block', {
	title: __('Git卡片'),
	icon: 'carrot',
	category: 'common',
	keywords: [
		__('gitcards'),
		__('git卡片'),
	],
	attributes: {
		giturl: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-giturl',
			selector: 'section',
		},
		gitsite: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-gitsite',
			selector: 'section',
		},
	},

	edit: ({ attributes, setAttributes, className }) => {
		if (!attributes.gitsite) { setAttributes({ gitsite: "1" }) }
		if (!attributes.giturl) { setAttributes({ giturl: " " }) }
		return <div class={className} data-gitsite={!attributes.gitsite ? 1 : attributes.gitsite}>
			<h3>gitCard 卡片配置</h3>
			<SelectControl
				label="git平台"
				value={attributes.gitsite}
				options={[
					{ label: 'Github', value: '1' },
					{ label: 'Coding', value: '2' },
					{ label: 'Gitee(码云)', value: '3' },
					{ label: 'Gitlab', value: '4' },
				]}
				onChange={(gitsite) => setAttributes({ gitsite: gitsite })}
			/>
			<TextControl
				label='git仓库地址(URL)'
				value={attributes.giturl}
				onChange={(giturl) => setAttributes({ giturl: giturl })}
			/>
		</div>;
	},

	save: ({ attributes, className }) => {
		return <section class={className} data-gitsite={attributes.gitsite} data-giturl={attributes.giturl}>
			<div class={"gitcard-body"}>
				<div class="gitspinner">
					<div class="gitrect1"></div>
					<div class="gitrect2"></div>
					<div class="gitrect3"></div>
					<div class="gitrect4"></div>
					<div class="gitrect5"></div>
				</div>
			</div>
		</section>;
	}
})
