import { useCurrentEditor } from '@tiptap/react';
import { useCallback, useState } from 'react';
import { FaLink } from "react-icons/fa6";

function LinkComp() {
    const { editor } = useCurrentEditor();
    const [toggle, setToggle] = useState(false);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const setLink = useCallback(() => {
        // Validate URL
        if (!isValidUrl(url)) {
            setError('Invalid URL');
            return;
        }

        // Clear error message
        setError('');

        // Empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // Update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        setToggle(false);  
    }, [editor, url]);

    const clearLink = useCallback(() => {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        setUrl('');  
        setError(''); 
        setToggle(false);  
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className='tip-HighlightComp position-relative'>
                <button className='bg-none' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Link">
                    <FaLink />
                </button>
                {toggle && (
                    <div className='comman-grid hg-grid'>
                        <input
                            type="text"
                            placeholder='Enter Url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {error && <div className='error-message'>{error}</div>}
                        <div className='link-button'>
                            <button className='bg-none clear' onClick={clearLink}>Clear</button>
                            <button onClick={setLink} className={editor.isActive('link') ? 'is-active bg-none' : 'bg-none'}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LinkComp;
