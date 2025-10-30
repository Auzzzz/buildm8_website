export interface user_property_type {
    properties: user_property[];
}

export interface user_property {
  user_property_id: string
  user_id: string
  property_address: string
  property_suburb: string
  property_state: string
  property_postcode: string
  property_type: string
  property_nickname: string
  property_is_primary: boolean
  property_use: string
  property_created_at: string
  property_updated_at: string
}
