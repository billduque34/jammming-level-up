export function PreviewPlayback({playPreview}) {
    return (<div className="PreviewPlayback">
                <audio autoPlay src={playPreview}/>
            </div>);
}