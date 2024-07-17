import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon />
                <Highlight 
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input 
                    style={{width: '100%'}}
                    placeholder="Nome da turma"
                />

                <Button
                    title="Criar"
                    style={{width: '100%', marginTop:20}}
                />
            </Content>
        </Container>
    )
}