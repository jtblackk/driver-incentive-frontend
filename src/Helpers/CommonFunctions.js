import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'

export default async function getUserDetails() {
  const user = await Auth.currentAuthenticatedUser()
  let user_email = user.attributes.email

  // get user's data
  // TODO: make this get data from the new user table (need to create a get request for that table)
  let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Username=${user_email}`
  const response = await fetch(GET_USERDATA_URL)
  const data = await response.json()
  let parsed_details = JSON.parse(data.body)
  let profile_details = {
    Username: parsed_details.Items[0].Username.S,
    FirstName: parsed_details.Items[0].FirstName.S,
    LastName: parsed_details.Items[0].LastName.S,
    Bio: parsed_details.Items[0].Bio.S,
    AccountType: parsed_details.Items[0].AccountType.S,
    AccountStatus: parseInt(parsed_details.Items[0].AccountStatus.S),
    // TODO: make sure that any component that needs these three pulls them on their own
    // SponsorEmailID: data.Item.SponsorEmailID,
    // TotalPoints: data.Item.TotalPoints,
  }

  return profile_details
}
