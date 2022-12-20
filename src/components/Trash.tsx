import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TrashBox = styled.div<{ isDraggingOver: boolean }>`
    position: fixed;
    right: 20px;
    top: 20px;
    padding: 20px;
    text-align: center;
    svg {
        font-size: 50px;
        color: ${(props) => (props.isDraggingOver ? "black" : "white")};
        transition: color 0.3s;
    }
    span {
        display: block;
        margin-top: 10px;
        font-size: 14px;
        color: ${(props) => (props.isDraggingOver ? "black" : "white")};
        transition: color 0.3s;
    }
`;

const Trash = () => {
    return (
        <Droppable droppableId="delete">
            {(magic, info) => (
                <TrashBox isDraggingOver={info.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span>
                        이 쪽으로 드래그하여 <br />
                        삭제해주세요.
                    </span>
                </TrashBox>
            )}
        </Droppable>
    );
};

export default Trash;
