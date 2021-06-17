import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './Random-card.css'
import { Typography } from '@material-ui/core';

const RandomCard = props => {
    return (
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 0 }} md={6} lg={3}>
            <Link className="random-card-link" to={`/courses/${props._id}`}>
                <Card style={{maxWidth: '345px', maxHeight: '300px'}}>
                    <CardActionArea>
                        <CardMedia style={{height:'140px'}} image={props.imageUrl} title={props.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{props.title}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{props.category}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{props.description}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{props.difficultyLevel} | {props.duration}hrs</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Col>
    )
}
{/* <Card className={classes.root}>
<CardActionArea>
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Lizard
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
      across all continents except Antarctica
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
</Card> */}

export default RandomCard