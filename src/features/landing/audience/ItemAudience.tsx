import "./Audience.scss"

const ItemAudience = (props: {text: string, index: number}) => {

  const {text, index} = props;

  return (
    <div>
      <div>
        <img src={require(`../../../_assets/photo/audience/item${index + 1}.jpg`)} alt="audience"/>
      </div>
      <div className={"audience__text"}>{text}</div>

    </div>
  );
};

export default ItemAudience;