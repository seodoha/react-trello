import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import DragabbleCard from "./components/DragabbleCard";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 700px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
`;

const Board = styled.div`
    min-height: 200px;
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;

        setToDos((oldToDos) => {
            const copyToDos = [...oldToDos];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);
            return copyToDos;
        });
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board ref={magic.innerRef} {...magic.droppableProps}>
                                {toDos.map((todo, index) => (
                                    <DragabbleCard key={todo} todo={todo} index={index} />
                                ))}
                                {magic.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
