import React, {
	Children,
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from "react";
import "../styles/Draggable.css";
import { debounce } from "underscore";
function Draggable({ Children, handleRef, onMove, x, y }) {
	const dragRef = useRef(null);
	const initialX = useRef(0);
	const initialY = useRef(0);
	const [postion, Setpostion] = useState({ x, y });

	// const Move = useMemo({() => debounce(함수, 초)});
	const Move = useMemo(() => debounce((x, y) => onMove(x, y), 500), [onMove]);

	const onMouseMove = useCallback((event) => {
		Setpostion({
			x: event.clientX - initialX.current,
			y: event.clientY - initialY.current,
		});
		console.log("hi");
		Move(event.clientX - initialX.current, event.clientY - initialY.current);
	}, []);
	const removeEvents = () => {};

	const onMouseDown = useCallback((event) => {
		const { left, top } = dragRef.current.getBoundingClientRect();
		initialX.current = event.clientX - left; //정사격형 내에서의 X좌표
		initialY.current = event.clientY - top; //정사격형 내에서의 Y좌표
		document.addEventListener("mousemove", onMouseMove); //마우스 이동
		document.addEventListener("mouseup", removeEvents); // 마우스 이벤트 날리기
		document.body.addEventListener("mouseleave", removeEvents); // 마우스 이벤트 날리기
	}, []);

	useEffect(() => {
		const handle = handleRef.current;
		handle.addEventListener("mousedown", onMouseDown); //
		return () => {
			handle.removeEventListerner("mousedown", onMouseDown);
		};
	}, [handleRef, onMouseDown]);

	return (
		<div
			ref={dragRef}
			className="draggable"
			style={{ transform: `tranlate(${0}px,${0}px)` }}
		>
			{Children}
		</div>
	);
}
export default Draggable;
