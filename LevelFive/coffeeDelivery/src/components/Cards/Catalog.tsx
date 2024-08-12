import Root from "./Components";

import SvgCoofee from "@assets/coffees/Expresso.svg"

export default function CatalogCard() {
	return (
		<Root>
			<Root.Container>
				<Root.Thumbnail>
					<SvgCoofee />
				</Root.Thumbnail>

				<Root.Details>
					<Root.Title>Expresso Tradicional</Root.Title>
					<Root.Description>O tradicional café feito com água quente e grãos moídos</Root.Description>

					<Root.Price>
						<Root.Currency>R$</Root.Currency>
						<Root.Value>9,90</Root.Value>
					</Root.Price>
				</Root.Details>

			</Root.Container>
		</Root>
	)
}