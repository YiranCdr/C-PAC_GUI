import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProjectCard from '../components/ProjectCard';
import PipelineCard from '../components/PipelineCard';
import DatasetCard from '../components/DatasetCard';

import Box from './Box'


class Home extends Component {

  static styles = theme => ({
    title: {
      marginBottom: 10
    },
    paper: {
      margin: 0,
      padding: 20,
      flexGrow: 1,
    },
    cell: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    expand: {
      flexGrow: 1
    }
  });

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <Grid container spacing={8}>
        <Grid item sm={6} className={classes.cell}>
          <Box title="Recent Projects" className={classes.expand}>
            <Grid container spacing={8}>
              {
                projects && projects.map((project) => (
                  <Grid item key={project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={6} className={classes.cell}>
          <Box title="About C-PAC" className={classes.expand}>
            <Typography paragraph>
              The Configurable Pipeline for the Analysis of Connectomes (C-PAC) is an
              open-source software pipeline for automated preprocessing and analysis
              of resting-state fMRI data.
            </Typography>
            <Typography paragraph>
              C-PAC builds upon a robust set of existing
              software packages including AFNI, FSL, and ANTS, and makes it easy for
              both novice users and experts to explore their data using a wide array
              of analytic tools.
            </Typography>
            <Typography paragraph>
              Users define analysis pipelines by specifying a
              combination of preprocessing options and analyses to be run on an
              arbitrary number of subjects. Results can then be compared across
              groups using the integrated group statistics feature.
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Box title="Explore" className={classes.expand}>
            <Grid container spacing={32}>
              <Grid item sm={12}>
                <Typography variant="h6" className={classes.title}>
                  Datasets
                </Typography>
                <Grid container spacing={8}>
                  {
                    datasets && datasets.map((dataset) => (
                      <Grid item key={dataset.id}>
                        <DatasetCard dataset={dataset} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h6" className={classes.title}>
                  Pipelines
                </Typography>
                <Grid container spacing={8}>
                  {
                    pipelines && pipelines.map((pipeline) => (
                      <Grid item key={pipeline.id}>
                        <PipelineCard pipeline={pipeline} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: ((state.main.config || {}).projects) || [],
  pipelines: ((state.main.config || {}).pipelines) || [],
  datasets: ((state.main.config || {}).datasets) || [],
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
