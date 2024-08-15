import styled, { css } from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	background-color: ${({theme}) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
	flex: 1;
	gap: 16px;
	padding: 32px;
	margin-top: 16px;
`;

export const Message = styled.Text`
	text-align: center;
	margin: 24px;

	${({ theme }) => css`
		color: ${theme.COLORS.WHITE};
		font-size: ${theme.FONT_SIZE.SM}px;
		font-family: ${theme.FONT_FAMILY.REGULAR};
	`};
`;