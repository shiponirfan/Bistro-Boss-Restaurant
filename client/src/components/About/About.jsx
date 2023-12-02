import chefService from "../../assets/home/chef-service.jpg";
const About = () => {
  return (
    <div className="container mx-auto px-6 lg:px-8 relative">
      <img src={chefService} alt="about" />
      <div className="p-24 w-9/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-center">
        <h2 className="text-5xl mb-4">Bistro Boss</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
          nihil iusto ducimus incidunt quibusdam nemo.
        </p>
      </div>
    </div>
  );
};

export default About;
