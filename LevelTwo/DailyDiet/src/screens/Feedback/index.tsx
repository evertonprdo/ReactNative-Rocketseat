import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { BoldText, Container, FeedbackContainer, Headline, ImageFeedback } from "./styles";
import { SubHeadline } from "@components/StatisticCard/styles";
import { Button } from "@components/Button";

import GoodImg from "@assets/feedback/good/image.png"
import BadImg from "@assets/feedback/bad/image.png"

export function Feedback() {
    const { navigate } = useNavigation();

    const [ isGood, setIsGood ] = useState(false);
    const headlineText = isGood
        ? "Continue Assim!"
        : "Que pena!"
    ;

    return (
        <Container>
            <FeedbackContainer>
                <Headline type={ isGood ? "GREEN" : "RED" }>
                    { headlineText }
                </Headline>

                {isGood ? (
                    <SubHeadline style={{textAlign: "center"}}>

                        Você continua <BoldText>dentro da dieta.</BoldText> Muito bem!
                    </SubHeadline>
                ) : (
                    <SubHeadline style={{textAlign: "center"}}>
                        
                        Você <BoldText>saiu da dieta</BoldText> dessa vez, mas continue se esforçando e não desista!
                    </SubHeadline>
                )}
            </FeedbackContainer>

            <ImageFeedback
                source={ isGood ? GoodImg : BadImg }
                resizeMode="contain"
            />

            <Button
                title="Ir para a página inicial"
                type="Dark"
                onPress={() => navigate("home")}
            />
        </Container>
    )
}