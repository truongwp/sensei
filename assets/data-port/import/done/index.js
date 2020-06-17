import { __, _n } from '@wordpress/i18n';
import { Section } from '@woocommerce/components';
import { formatString } from '../../../setup-wizard/helpers/format-string';
import { Button, Dashicon } from '@wordpress/components';
import { ImportLog } from './import-log';

/**
 * Done page of the importer.
 */
export const DonePage = ( { restartImport } ) => {
	const result = [
		{
			type: 'course',
			count: 1,
			errors: [
				{
					title: 'Course 1',
					reason: 'Invalid title',
				},
			],
		},
		{
			type: 'lesson',
			count: 3,
			errors: [
				{
					title: 'Lesson 1',
					reason: 'Invalid title',
				},
				{
					title: 'Lesson 2',
					reason: 'Invalid everything',
				},
			],
		},
		{
			type: 'question',
			count: 15,
			errors: [],
		},
	];

	const getPostTypeLabel = ( { type, count } ) =>
		( {
			course: _n( 'course', 'courses', count, 'sensei-lms' ),
			lesson: _n( 'lesson', 'lessons', count, 'sensei-lms' ),
			question: _n( 'question', 'questions', count, 'sensei-lms' ),
		}[ type ] );

	const getPostTypeLabelWithLink = ( { type, count } ) => {
		const typeLabel = getPostTypeLabel( { type, count } );
		return formatString( `{{link}}${ typeLabel }{{/link}}`, {
			// eslint-disable-next-line jsx-a11y/anchor-has-content
			link: <a href={ `edit.php?post_type=${ type }` } />,
		} );
	};

	const hasErrors = result.some( ( { errors } ) => errors.length );

	return (
		<section className="sensei-import-form sensei-import-done">
			<Section className="sensei-import-form__body" component="section">
				<section className="sensei-import-done__result">
					<Dashicon
						icon="yes-alt"
						size={ 150 }
						className="sensei-import-done__result-icon"
					/>
					<p>
						{ __(
							'The following content was successfully imported:',
							'sensei-lms'
						) }
					</p>
					<ul>
						{ result.map( ( { type, count } ) => (
							<li key={ type }>
								{ count }{ ' ' }
								{ getPostTypeLabelWithLink( {
									type,
									count,
								} ) }
							</li>
						) ) }
					</ul>
				</section>
				{ hasErrors && (
					<>
						<section className="sensei-import-done__errors">
							<p>
								{ formatString(
									__(
										'The following content {{strong}}failed{{/strong}} to import:',
										'sensei-lms'
									)
								) }
							</p>
							<ul>
								{ result
									.filter( ( { errors } ) => errors.length )
									.map( ( { type, errors } ) => (
										<li key={ type }>
											{ errors.length }{ ' ' }
											{ getPostTypeLabel( {
												type,
												count: errors.length,
											} ) }
										</li>
									) ) }
							</ul>
						</section>
						<section className="sensei-import-done__log">
							<ImportLog result={ result } />
						</section>
					</>
				) }

				<div className="continue-container sensei-import-footer">
					<Button isPrimary onClick={ restartImport }>
						{ __( 'Import More Content', 'sensei-lms' ) }
					</Button>
				</div>
			</Section>
		</section>
	);
};
