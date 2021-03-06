import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

import SingleLineInput from '../single-line-input';

/**
 * Edit lesson block component.
 *
 * @param {Object}   props                   Component props.
 * @param {string}   props.clientId          Block client ID.
 * @param {string}   props.name              Block name.
 * @param {string}   props.className         Custom class name.
 * @param {Object}   props.attributes        Block attributes.
 * @param {string}   props.attributes.title  Lesson title.
 * @param {Function} props.setAttributes     Block set attributes function.
 * @param {Function} props.insertBlocksAfter Insert blocks after function.
 */
const EditLessonBlock = ( {
	clientId,
	name,
	className,
	attributes: { title },
	setAttributes,
	insertBlocksAfter,
} ) => {
	const { selectNextBlock, removeBlock } = useDispatch( 'core/block-editor' );

	/**
	 * Handle change.
	 *
	 * @param {string} value Lesson name.
	 */
	const handleChange = ( value ) => {
		setAttributes( { title: value } );
	};

	/**
	 * Go to next lesson. If there is not a next lesson, it creates one.
	 */
	const goToNextLesson = async () => {
		const blocks = await selectNextBlock( clientId );

		if ( ! blocks && 0 < title.length ) {
			insertBlocksAfter( [ createBlock( name ) ] );
		}
	};

	/**
	 * Remove lesson.
	 *
	 * @param {Object}   e                Event object.
	 * @param {Function} e.preventDefault Prevent default function.
	 */
	const removeLesson = ( e ) => {
		if ( 0 === title.length ) {
			e.preventDefault();
			removeBlock( clientId );
		}
	};

	/**
	 * Handle key down.
	 *
	 * @param {Object} e         Event object.
	 * @param {number} e.keyCode Pressed key code.
	 */
	const handleKeyDown = ( e ) => {
		// Enter pressed.
		if ( 13 === e.keyCode ) {
			goToNextLesson();
		}

		// Backspace pressed.
		if ( 8 === e.keyCode ) {
			removeLesson( e );
		}
	};

	return (
		<div className={ className }>
			<SingleLineInput
				className="wp-block-sensei-lms-course-outline-lesson__input"
				placeholder={ __( 'Lesson name', 'sensei-lms' ) }
				value={ title }
				onChange={ handleChange }
				onKeyDown={ handleKeyDown }
			/>
		</div>
	);
};

export default EditLessonBlock;
