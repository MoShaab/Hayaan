export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      beneficiaries: {
        Row: {
          age: number | null
          arrival_date: string | null
          assigned_mentor: string | null
          beneficiary_id: string
          category: string
          contact_phone: string | null
          created_at: string | null
          family_size: number | null
          full_name: string
          gender: string | null
          id: string
          location: string | null
          partner_id: string | null
          program_start_date: string | null
          self_reliance_score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          arrival_date?: string | null
          assigned_mentor?: string | null
          beneficiary_id: string
          category: string
          contact_phone?: string | null
          created_at?: string | null
          family_size?: number | null
          full_name: string
          gender?: string | null
          id?: string
          location?: string | null
          partner_id?: string | null
          program_start_date?: string | null
          self_reliance_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          arrival_date?: string | null
          assigned_mentor?: string | null
          beneficiary_id?: string
          category?: string
          contact_phone?: string | null
          created_at?: string | null
          family_size?: number | null
          full_name?: string
          gender?: string | null
          id?: string
          location?: string | null
          partner_id?: string | null
          program_start_date?: string | null
          self_reliance_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_assigned_mentor_fkey"
            columns: ["assigned_mentor"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beneficiaries_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          beneficiary_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          mentor_id: string | null
          notes: string | null
          type: string
        }
        Insert: {
          beneficiary_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          mentor_id?: string | null
          notes?: string | null
          type: string
        }
        Update: {
          beneficiary_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          mentor_id?: string | null
          notes?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      instruments: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      mentors: {
        Row: {
          created_at: string | null
          current_beneficiaries: number | null
          id: string
          max_beneficiaries: number | null
          partner_id: string | null
          profile_id: string | null
          specialization: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          current_beneficiaries?: number | null
          id?: string
          max_beneficiaries?: number | null
          partner_id?: string | null
          profile_id?: string | null
          specialization?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          current_beneficiaries?: number | null
          id?: string
          max_beneficiaries?: number | null
          partner_id?: string | null
          profile_id?: string | null
          specialization?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentors_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          beneficiary_id: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          points: number | null
          status: string | null
          target_date: string | null
          title: string
        }
        Insert: {
          beneficiary_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          points?: number | null
          status?: string | null
          target_date?: string | null
          title: string
        }
        Update: {
          beneficiary_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          points?: number | null
          status?: string | null
          target_date?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          area_of_operation: string | null
          contact_person: string | null
          created_at: string | null
          id: string
          organization_name: string
          payment_status: string | null
          project_title: string | null
          status: string | null
        }
        Insert: {
          area_of_operation?: string | null
          contact_person?: string | null
          created_at?: string | null
          id?: string
          organization_name: string
          payment_status?: string | null
          project_title?: string | null
          status?: string | null
        }
        Update: {
          area_of_operation?: string | null
          contact_person?: string | null
          created_at?: string | null
          id?: string
          organization_name?: string
          payment_status?: string | null
          project_title?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_contact_person_fkey"
            columns: ["contact_person"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          organization: string | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          organization?: string | null
          phone?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      progress_logs: {
        Row: {
          beneficiary_id: string | null
          created_at: string | null
          description: string
          id: string
          log_type: string
          mentor_id: string | null
          score_impact: number | null
        }
        Insert: {
          beneficiary_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          log_type: string
          mentor_id?: string | null
          score_impact?: number | null
        }
        Update: {
          beneficiary_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          log_type?: string
          mentor_id?: string | null
          score_impact?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_logs_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_logs_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
