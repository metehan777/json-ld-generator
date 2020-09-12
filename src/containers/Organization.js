import React from 'react';
import { connect } from 'react-redux';
import TextInput from '../components/TextInput';
import UrlInput from '../components/UrlInput';
import ListInput from '../components/ListInput';
import Select from '../components/Select';
import { updateOrganization, validateOrganization } from '../actions';
import { object, func } from 'prop-types';
import { Form, FormGroup, FormFeedback, Label, InputGroup } from 'reactstrap';

const ORG_TYPES = [
  {
    id: 'Organization',
    name: 'FAQ Generator'
  },

];

let Organization = ({ updateOrganization, validateOrganization, organization, validation }) => {
  const handleImgError = (prop, value) => {
    const validationVal = value ? false : undefined;
    return validateOrganization({ [prop]: validationVal });
  };

  return (
    <div>
      <h2>Organisaatio</h2>
      <Form>
        <FormGroup>
          <Label for='orgType'>FAQ SEO Generator </Label>
          <Select id='orgType' options={ORG_TYPES} onChange={(type) => updateOrganization({ '@type': type })} />
        </FormGroup>
        <FormGroup>
          <Label for='orgName'>Soru 1</Label>
          <TextInput id='orgName' value={organization.name} placeholder='Soru 1' onChange={(name) => updateOrganization({ name })} />
        </FormGroup>
        <FormGroup>
          <Label for='orgAltName'>Soru 2</Label>
          <TextInput id='orgAltName' value={organization.alternateName} placeholder='' onChange={(alternateName) => updateOrganization({ alternateName })} />
        </FormGroup>
        <FormGroup>
          <Label for='orgUrl'>Verkko-osoite</Label>
          <UrlInput id='orgUrl' value={organization.url}
            placeholder='https://esimerkki.fi' onChange={(url) => updateOrganization({ url })} />
          <FormFeedback>Arvo ei kelpaa verkko-osoitteeksi</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for='orgLogo'>Logo</Label>
          <InputGroup>
            <TextInput id='orgLogo' valid={validation.logo} value={organization.logo}
              placeholder='https://esimerkki.fi/logo.png' onChange={(logo) => updateOrganization({ logo })} />
            <img className="img img-sm" src={organization.logo} onLoad={() => validateOrganization({ logo: true })}
              onError={() => handleImgError('logo', organization.logo)} />
            <FormFeedback htmlFor='orgLogo'>Osoitteesta ei löytynyt kuvaa</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='orgSameAs'>Sosiaalinen media</Label>
          <ListInput id='orgSameAs' values={organization.sameAs} placeholder='https://facebook.com/esimerkki' Input={UrlInput} onChange={(sameAs) => updateOrganization({ sameAs })} />
        </FormGroup>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  organization: state.organization,
  validation: state.validation.organization
});

const mapDispatchToProps = ({
  updateOrganization,
  validateOrganization
});

Organization = connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);

Organization.propTypes = {
  organization: object,
  validation: object,
  updateOrganization: func,
  validateOrganization: func,
  addToOrganization: func
};

export default Organization;
