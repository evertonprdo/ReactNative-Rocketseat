import { css } from "styled-components";
import styled from "styled-components/native";

export const Container = styled.View`
	width: 100%;
	padding: 0 32px 24px;
	flex-direction: row;
	justify-content: space-between;

	background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Title = styled.Text`
	${({theme}) => css`
		color: ${theme.COLORS.GRAY_100};
		font-size: ${theme.FONT_SIZE.XL}px;
		font-family: ${theme.FONT_FAMILY.BOLD};
	`};
`;