import styled, { css } from "styled-components/native";

export const Container = styled.View`
	width: 100%;
	padding: 16px;
	border-radius: 6px;

	background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
	${({theme}) => css`
		color: ${theme.COLORS.GRAY_300};
		font-size: ${theme.FONT_SIZE.SM}px;
		font-family: ${theme.FONT_FAMILY.REGULAR};
	`};
`;

export const Input = styled.TextInput`
	text-align: center;
	margin-top: 16px;

	${({theme}) => css`
		color: ${theme.COLORS.GRAY_200};
		font-size: ${theme.FONT_SIZE.XXXL}px;
		font-family: ${theme.FONT_FAMILY.BOLD};
	`};
`;