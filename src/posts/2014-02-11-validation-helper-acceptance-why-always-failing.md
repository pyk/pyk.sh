---
layout: post.njk
title: |
    Validation Helper: why acceptance always fail?
description: |
    why this happen? first, you need to now is acceptance used without
    such a column, in which case it defines an attribute accessor and uses
    that for its validation. so when we provide terms_of_service column
    it make our validation always failing.
date: 2014-02-11
tags:
    - post
    - rails
---

lets assume we have `people` table with schema like this

```text
# Table name: people
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  terms_of_service :boolean
```

and `Person` model defined like this

```ruby
class Person < ActiveRecord::Base
  validates :name, presence: true
  validates :terms_of_service, acceptance: true
end
```

when you trying to save your data

```ruby
>> Person.create(name: "bayu", terms_of_service: false).errors
   (0.4ms)  BEGIN
   (0.6ms)  ROLLBACK
=> #<ActiveModel::Errors:0xba205264 @base=#<Person id: nil, name: "asssS", created_at: nil, updated_at: nil, terms_of_service: false>, @messages={:terms_of_service=>["must be accepted"]}>
>> Person.create(name: "bayu", terms_of_service: true).errors
   (0.4ms)  BEGIN
   (0.4ms)  ROLLBACK
=> #<ActiveModel::Errors:0xba1ea4f0 @base=#<Person id: nil, name: "asssS", created_at: nil, updated_at: nil, terms_of_service: true>, @messages={:terms_of_service=>["must be accepted"]}>
```

whenever you insert `true` or `false` in `terms_of_service` column, it's always
return an error.

```ruby
@messages={:terms_of_service=>["must be accepted"]}
```

### so, why this happen?

first, you need to now is `acceptance` used without such a column, in which
case it defines an attribute accessor and uses that for its validation. so when
we provide `terms_of_service` column it make our validation always failing.

### solution

**remove `terms_of_service` column**

you have to remove this column to get validation helper work. but, if you think
it's important to use `terms_of_service` column you can use the next solution.

**add :accept option**

```ruby
class Person < ActiveRecord::Base
  validates :name, presence: true
  validates :terms_of_service, acceptance: {accept: true}
end
```

now your validation should work flawlessly.

```ruby
>> Person.create(name: "bayu", terms_of_service: true).valid?
   (0.3ms)  BEGIN
  SQL (8.0ms)  INSERT INTO "people" ("created_at", "name", "terms_of_service", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["created_at", Tue, 11 Feb 2014 14:29:40 UTC +00:00], ["name", "bayu"], ["terms_of_service", true], ["updated_at", Tue, 11 Feb 2014 14:29:40 UTC +00:00]]
   (67.9ms)  COMMIT
=> true
>> Person.create(name: "bayu", terms_of_service: false).valid?
   (0.4ms)  BEGIN
[deprecated] I18n.enforce_available_locales will default to true in the future. If you really want to skip validation of your locale you can set I18n.enforce_available_locales = false to avoid this message.
   (0.7ms)  ROLLBACK
=> false
```

### resources

[Validation Helpers: acceptance][ac]

[ac]: http://guides.rubyonrails.org/active_record_validations.html#acceptance
