const TextWithHighlight = ({ text = "", split = false, split_coma = false,split_dos_puntos=false,color="bg-constrast" }) => {
    // Función para procesar el texto con resaltados
    const safeText = text || "";

    const renderHighlightedText = (textToRender) => {
        const parts = textToRender.split(/(\*[^*]+\*)/g); // separa todo lo entre *...*

        return parts.map((part, index) =>
            part.startsWith("*") && part.endsWith("*") ? (
                <span key={index} className={`${color} bg-clip-text text-transparent`}>
                    {part.slice(1, -1)}
                </span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    if (split) {
        const words = safeText.split(" ");
        const firstWord = words[0];
        const remainingText = words.slice(1).join(" ");

        return (
            <div className="flex flex-col">
                <span className="block">  {renderHighlightedText(firstWord)}</span>
                <span className="block">
                    {renderHighlightedText(remainingText)}
                </span>
            </div>
        );
    }

    if (split_coma) {
        const words = safeText.split(",");
        const firstWord = words[0];
        const remainingText = words.slice(1).join(" ");

        return (
            <div className="flex flex-col">
                <span className="block">{renderHighlightedText(firstWord)}</span>
                <span className="block">
                    {renderHighlightedText(remainingText)}
                </span>
            </div>
        );
    }
    if (split_dos_puntos) {
        const words = safeText.split(":");
        const firstWord = words[0];
        const remainingText = words.slice(1).join(" ");

        return (
            <div className="flex flex-col">
                <span className="block">{firstWord}</span>
                <span className="block">
                    {renderHighlightedText(remainingText)}
                </span>
            </div>
        );
    }

    return <span>{renderHighlightedText(safeText)}</span>;
};

export default TextWithHighlight;
