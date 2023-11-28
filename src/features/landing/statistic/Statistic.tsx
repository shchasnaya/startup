import CircleDiagram from "./diagram/CircleDiagram";
import './Statistic.scss'


const Statistic = () => {
  return (
    <section className="statistic">
      <div className="container">
        <div className="statistic__diagrams">
          <div>
            <div className="statistic__diagrams_circle"><CircleDiagram/></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistic;