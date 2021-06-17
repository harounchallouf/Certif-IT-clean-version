import React, { Component } from 'react'
import { Col, Form } from 'react-bootstrap'
import './SearchBar.css'
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            sortBy: '',
            categoryFilter: 'default',
            levelFilter: 'default'
        }
    }

    handleInputChange = e => this.setState({ search: e.target.value }, () => this.props.filterBySearch(this.state.search))

    handleSortChange = e => this.setState({ sortBy: e.target.value }, () => this.props.sortBy(this.state.sortBy))

    handleCategoryChange = e => this.setState({ categoryFilter: e.target.value }, () => this.props.filterByCategory(this.state.categoryFilter))

    handleLevelChange = e => this.setState({ levelFilter: e.target.value }, () => this.props.filterByLevel(this.state.levelFilter))

    render() {
        return (
            <Form className="mb-5 mt-5 filter-bar" >
                <Form.Row>
                    <Form.Group as={Col} md={this.props.filterByCategory && this.props.filterByLevel ? '4' : '6'} controlId="search">
                        <Form.Control type="text" name="search" placeholder='Rechercher...' value={this.state.search} onChange={this.handleInputChange} />
                    </Form.Group>

                    {this.props.filterByCategory && this.props.filterByLevel ?
                        <>
                            <Form.Group as={Col} md='3' controlId="categoryFilter">
                                <Form.Control as='select' name='categoryFilter' value={this.state.categoryFilter} onChange={this.handleCategoryChange}>
                                    <option value='default' >Filtrer par catégorie</option>
                                    <option value='Design' >Front-end</option>
                                    <option value='Development' >Back-end</option>
                                    <option value='Marketing' >Full stack</option>
                                    <option value='Music' >Sécurité</option>
                                    <option value='Other' >Réseaux</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='3' controlId="levelFilter">
                                <Form.Control as='select' name='levelFilter' value={this.state.levelFilter} onChange={this.handleLevelChange}>
                                    <option value='default' >Filtrer par niveaux</option>
                                    <option value='Beginner' >Débutant</option>
                                    <option value='Intermidiate' >Intermédiaire</option>
                                    <option value='Advanced' >Avancé</option>
                                    <option value='All levels' >Tous les niveaux</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='2' controlId="sortBy">
                                <Form.Control as='select' name='sortBy' value={this.state.sortBy} onChange={this.handleSortChange}>
                                    <option>Trier par...</option>
                                    <option value='Name-A' >A-Z</option>
                                    <option value='Name-Z' >Z-A</option>
                                    <option value='Price-desc' >Prix descendant</option>
                                    <option value='Price-asc' >Prix ascendant</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                        :
                        <Form.Group as={Col} md='6' controlId="sortBy">
                            <Form.Control as='select' name='sortBy' value={this.state.sortBy} onChange={this.handleSortChange}>
                                <option>Trier par...</option>
                                <option value='Name-A' >A-Z</option>
                                <option value='Name-Z' >Z-A</option>
                            </Form.Control>
                        </Form.Group>
                    }

                </Form.Row>
            </Form>
        )
    }
}

export default SearchBar 