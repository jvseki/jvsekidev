type MarqueeProps = {
  items: readonly string[];
};

/**
 * Faixa infinita da stack, em CSS puro (sem JS nenhum). A lista é
 * renderizada duas vezes lado a lado e a trilha anda -50% em loop — o
 * encaixe é perfeito porque as duas metades são idênticas. A segunda
 * cópia é aria-hidden pra leitor de tela não ler a stack duas vezes.
 * Pausa no hover; parada sob reduced-motion.
 */
export function Marquee({ items }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Stack técnica"}>
      {items.map((item, i) => (
        <li key={item} className="marquee__item">
          <span className={i % 2 === 0 ? "marquee__solid" : "marquee__outline"}>{item}</span>
          <span className="marquee__sep" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
