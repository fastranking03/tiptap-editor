import { useCurrentEditor } from '@tiptap/react';
import { useCallback, useState } from 'react';
import { MdOutlineVideoLabel } from "react-icons/md";

function YoutubeComp() {
    const { editor } = useCurrentEditor();
    const [toggle, setToggle] = useState(false);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const isValidVideoUrl = (string) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|facebook\.com|video\.|\.mp4|\.webm|\.ogg)\/.+$/;
        return regex.test(string);
    };

    const addVideo = useCallback(() => {
        // Validate URL
        if (!isValidVideoUrl(url)) {
            setError('Invalid video URL');
            return;
        }

        // Clear error message
        setError('');

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            });
            setToggle(false); // Close the input box after setting the video
        }
    }, [editor, url]);

    const clearUrl = useCallback(() => {
        setUrl(''); // Clear the input value
        setError(''); // Clear the error message
        setToggle(false); // Close the input box
    }, []);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className='tip-HighlightComp position-relative'>
                <button className='bg-none' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Youtube">
                    <MdOutlineVideoLabel />
                </button>
                {toggle && (
                    <div className='comman-grid hg-grid'>
                        <input
                            type="text"
                            placeholder='Enter URL'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {error && <div className='error-message'>{error}</div>}
                        <div className='link-button'>
                            <button className='bg-none clear' onClick={clearUrl}>Clear</button>
                            <button onClick={addVideo}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default YoutubeComp;
