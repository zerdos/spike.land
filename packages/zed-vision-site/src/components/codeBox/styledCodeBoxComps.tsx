import styled from "@emotion/styled";

export const Header = styled.div`
    background: #3f51b5;
    font-family: "Roboto";
    margin: 0;@emotion/styled
    padding: 10px 20px 10px;
    color: white;
`;

export const CodeContainer = styled.div`
    display: block;
    width: 100%;
    height: 70vh;
`;

export const ResultContainer = styled.div`
    display: block;
    width: 100%;
`;

export const ErrorContainer = styled.div`
    display: block;
    width: 100%;
    padding: 10px;
    color: white;
    background: red;
    height: 220px;
    pre{
        font-size: 1em;
        line-height: 1;
    }
`;

export const ResultBox = styled.div`
    text-align: center;
    border-radius: 12px;
    width: 200px;
    height: 200px;
    display: flex;
    place-content: center;
    place-items: center;
    margin: 0;
    padding: 0;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;

export const ResultBoxContainer = styled.div`
    display: block;
    width: 150px;
    height: 150px;
    overflow: hidden;
`;
