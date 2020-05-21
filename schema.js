const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const projects = [
    {id: "1", title: "project1", desc: "desc for project1", image: ["fake image url"], stack: ['react', 'gatsby'],  code: "fake code url", project: "fake demo url"},
    {id: "2", title: "project2", desc: "desc for project2", image: ["fake image url"], stack: ['flutter', 'express'],  code: "fake code url", project: "fake demo url"},
    {id: "3", title: "project3", desc: "desc for project3", image: ["fake image url"], stack: ['mongodb', 'firebase'],  code: "fake code url", project: "fake demo url"}
];

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type:GraphQLString},
        title: {type: GraphQLString},
        desc: {type: GraphQLString},
        image: {type: GraphQLList(GraphQLString)},
        stack: {type: GraphQLList(GraphQLString)},
        code: {type: GraphQLString},
        demo: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                for (let i = 0; i < projects.length; i++){
                    if (projects[i].id == args.id){
                        return projects[i];
                    }
                }
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parentValue, args){
                return projects
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});