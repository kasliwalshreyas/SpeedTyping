import { useEffect, useRef } from "react";

const TypeWriter = ({ doneWords, pendingWords, handleKeyDown, handleReset, short = false }) => {

    const gameInput = useRef(null);

    useEffect(() => {
        document.getElementById('game_words')?.focus();
    }, []);



    return (
        <>
            <div
                className={`${short ? 'short' : ''}`}
                ref={gameInput} tabIndex="0" onBlur={() => gameInput.current?.focus()} id="game_words"
                onKeyDown={(e) => handleKeyDown(e)}
            >
                <div className="doneWords">
                    {doneWords.map((letter, index) => {
                        return <p key={index} className={`${letter.correct ? 'bg-green-200' : 'bg-red-200'}`}>{letter.letter}</p>
                    })}
                </div>
                <div className="cursor">|</div>
                <div className="pendingWords">
                    {pendingWords}
                </div>
            </div>
            {/* <Flex justify={'center'} align={'center'}>
                <Button onClick={handleReset} m={"10px 0"} w={'fit-content'} variant="subtle" >reset</Button>
            </Flex> */}

        </>
    );
}

export default TypeWriter;