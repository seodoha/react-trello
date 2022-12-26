import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TrashEl = styled.div<{ isDraggingOver: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    position: fixed;
    right: 0;
    top: 0;
    padding: 40px;
    border: 1px solid teal;
    background-color: ${(props) => props.isDraggingOver && "teal"};
    transition: all 0.3s;
    svg {
        font-size: 40px;
        color: ${(props) => props.isDraggingOver && "#fff"};
        transition: all 0.3s;
    }
    span {
        display: block;
        text-align: center;
        font-size: 18px;
        color: ${(props) => props.isDraggingOver && "#fff"};
        transition: all 0.3s;
    }
`;

function Trash() {
    return (
        <Droppable droppableId="delete">
            {(magic, info) => (
                <TrashEl isDraggingOver={info.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span>
                        드래그하여
                        <br />
                        삭제해주세요.
                    </span>
                </TrashEl>
            )}
        </Droppable>
    );
}

export default Trash;
